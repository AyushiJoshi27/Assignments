$(document).ready(function() {
  $('#tast-submit').click(function(e) {
    e.preventDefault();
    var tast = $('#task-input').val();
    if (task) {
      $('#tasks').append(`<li>${task}<button class="remove">X</button></li>`);
      $('#task-input').val('');
    }
  });

  $(document).on('click', 'remove', function() {
    $(this).parent().remove();
  });
});