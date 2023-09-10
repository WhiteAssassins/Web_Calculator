<?php
if (isset($_POST['expression'])) {
    $expression = $_POST['expression'];
    $result = eval('return ' . $expression . ';');
    echo $result;
}
?>
