from django.shortcuts import render, redirect
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioListCreate(APIView):
    def get(self, request):
        usuarios = Usuario.objects.all().order_by('-id')
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            usuario = Usuario.objects.get(pk=pk)
            usuario.delete()
            return Response({"message": "Usuário deletado com sucesso"}, status=status.HTTP_204_NO_CONTENT)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Erro ao deletar usuário: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def index(request):
    if request.method == 'POST':
        nome = request.POST.get('nome', '').strip()
        idade = request.POST.get('idade', '').strip()
        email = request.POST.get('email', '').strip()
        
        if not nome or not idade or not email:
            messages.error(request, 'Preencha todos os campos: Nome, Idade e Email.')
        else:
            try:
                idade_int = int(idade)
                if idade_int < 0 or idade_int > 100:
                    messages.error(request, 'Idade deve estar entre 0 e 100 anos.')
                else:
                    Usuario.objects.create(nome=nome, idade=idade_int, email=email)
                    messages.success(request, 'Usuário cadastrado com sucesso!')
                    return redirect('index')
            except ValueError:
                messages.error(request, 'Idade deve ser um número válido.')
            except Exception as exc:
                messages.error(request, f'Erro ao salvar: {exc}')
    
    usuarios = Usuario.objects.all().order_by('-id')
    return render(request, 'dados_usuarios/index.html', {
        'usuarios': usuarios,
    })

