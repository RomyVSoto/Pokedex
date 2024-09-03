$(document).ready(function () {
    $(".delete-tipo").on("click", function (e) {
      e.preventDefault();
  
      if (confirm("Estás seguro de eliminar este tipo?")) {
        $(this).closest(".form-delete").submit();
      }
    });
  });
  