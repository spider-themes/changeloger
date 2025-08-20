jQuery(document).ready(function ($) {
  $('.aagb-search-control').on('input', function () {
    const searchTxt = $(this).val().toLowerCase();
    const targetId = $(this).attr('data-searchTarget');

    const $items = $('#' + targetId + ' .changelog-info-item');
    const $helpBlock = $('#' + targetId + ' #aagb-search-help-block');

    let matchCount = 0;

    $items.each(function () {
      const $item = $(this);
      const date = $item.find('.date span:first').text().toLowerCase();
      const version = $item.find('.version-tag').text().toLowerCase();
      const changes = $item.find('.content').text().toLowerCase();

      if (
        date.includes(searchTxt) ||
        version.includes(searchTxt) ||
        changes.includes(searchTxt)
      ) {
        $item.show();
        matchCount++;
      } else {
        $item.hide();
      }
    });

    if (searchTxt.length > 0) {
      if (matchCount > 0) {
        $helpBlock.text(matchCount + ' result(s) found.').show();
      } else {
        $helpBlock.text('No results found.').show();
      }
    } else {
      $items.show();
      $helpBlock.hide();
    }
  });
});
