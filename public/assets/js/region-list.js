$(document).ready(function () {
    $(".delete-region").on("click", function (e) {
      e.preventDefault();
  
      if (confirm("Estás seguro de eliminar esta region?")) {
        $(this).closest(".form-delete").submit();
      }
    });
  });
  