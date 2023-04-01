<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>EcoTube</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="shortcut icon" href="../imagens/favicon.ico" type="image/x-icon">
    <script src="https://kit.fontawesome.com/cae157d5c6.js" crossorigin="anonymous"></script>
</head>

<body class="corpo">
    <?php
              $cod_produto = $_GET["cod_produto"];
              include "cad_getinfo_produto_back.php"; 
              session_start();
       ?>

    <header class="cabecalho">
        <div class="cableft">
            <a class="logo" href="../index.php"><img class="logo" src="../imagens/logo.svg" alt="logo"></a>
        </div>
        <div class="cabcenter">
            <a class="fixo" href="../index.php">Home</a>&nbsp;
            <?php
                if (isset($_SESSION['isadm']) && $_SESSION['isadm'] == 't'){
                    echo "<a class='fixo' href='cad_pesq_produtos_front.php''>Tab. Produtos</a>&nbsp;";
                    echo "<a class='fixo' href='cad_pesq_usuarios_front.php''>Tab. Usuários</a>&nbsp;";
                }
                else{
                    echo "<a class='fixo' href='../venda/selecao_produtos_front.php'>Produtos</a>&nbsp;";
                    echo "<a class='fixo' href='../devs.php'>Devs</a>&nbsp;";
                    echo "<a class='fixo' href='../estatisticas.php'>Estatísticas</a>&nbsp;";
                }
            ?>
        </div>
        <div class="cabright">
            <?php 
                if (isset($_SESSION['usuariologado']))
                {
                    echo "<p class='usuario_cab'>Olá, ".$_SESSION['usuariologado']['nome']."</p>";
                    echo "<a class='fixo' href='../login/logoff_back.php' title='Sair'><i class='fa-solid fa-right-from-bracket'></i></a>";
                }
                else{
                    echo "<a class='fixo' href='../login/login_front.php' title='Login'><i
                    class='fa-solid fa-user'></i></a>&nbsp;";
                }
            ?>
            <a class="fixo" href="../venda/carrinho_front.php" title="Carrinho" id="iconcarrinho"><i
                    class="fa-solid fa-cart-shopping"></i></a>&nbsp;
        </div>
    </header>

    <div class="divmae">
        <div class="produtos-box">
            <h2>Confirmação: Exclusão de Produtos</h2>
            <form action="cad_exclui_produtos_back.php" method="post">
                <div class="metade1">
                    <div class="user-box">
                        <input type="text" name="cod_produto" value="<?php echo $linha['cod_produto']; ?>" readonly>
                        <label id="lbl_sem_animacao">Código de produto</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="nome" value="<?php echo $linha['nome']; ?>" readonly>
                        <label id="lbl_sem_animacao">Nome</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="descricao" value="<?php echo $linha['descricao']; ?>" readonly>
                        <label id="lbl_sem_animacao">Descrição</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="preco" value="<?php echo $linha['preco']; ?>" readonly>
                        <label id="lbl_sem_animacao">Preço</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="quantidade" value="<?php echo $linha['quantidade']; ?>" readonly>
                        <label id="lbl_sem_animacao">Quantidade</label>
                    </div>
                    <center>
                        <a class="btn_exclui" href="cad_pesq_produtos_front.php">Voltar</a>
                    </center>
                </div>
                <div class="metade2">
                    <div class="user-box">
                        <input type="text" name="codigovisual" value="<?php echo $linha['codigovisual']; ?>" readonly>
                        <label id="lbl_sem_animacao">Código visual</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="custo" value="<?php echo $linha['custo']; ?>" readonly>
                        <label id="lbl_sem_animacao">Custo</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="margem_lucro" value="<?php echo $linha['margem_lucro']; ?>" readonly>
                        <label id="lbl_sem_animacao">Margem de lucro</label>
                    </div>
                    <div class="user-box">
                        <input type="text" name="icms" value="<?php echo $linha['icms']; ?>" readonly>
                        <label id="lbl_sem_animacao">Icms</label>
                    </div>
                    <center>
                        <input class="btn_exclui" type="button" value="Editar"
                            onclick="location.href='cad_altera_produtos_front.php?cod_produto=<?php echo $cod_produto ?>';">
                        <input type="submit" value="Confirmar">
                    </center>
                </div>
            </form>
        </div>
    </div>
</body>

</html>