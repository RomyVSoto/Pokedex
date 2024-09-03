$(document).ready(function () {
    $(".delete-pokemon").on("click", function (e) {
      e.preventDefault();
  
      if (confirm("Estás seguro de eliminar este pokemon?")) {
        $(this).closest(".form-delete").submit();
      }
    });
  });
  