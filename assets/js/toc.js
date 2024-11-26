document.addEventListener("DOMContentLoaded", function() {
    var content = document.getElementById('main-content');
    var toc = document.getElementById('sidebar');
    var headers = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
    if (headers.length > 0) {
      var tocList = document.createElement('ul');
      tocList.classList.add('space-y-2');
  
      headers.forEach(function(header) {
        var level = parseInt(header.tagName.substr(1));
        var text = header.textContent;
        var id = header.id || text.replace(/\s+/g, '-').toLowerCase();
        header.id = id;
  
        var link = document.createElement('a');
        link.href = '#' + id;
        link.textContent = text;
        link.classList.add('text-gray-700', 'hover:text-blue-500');
  
        var listItem = document.createElement('li');
        listItem.classList.add('toc-item', 'pl-' + (level * 2), 'level-' + level);
  
        // Collapse sub-items
        if (level > 1) {
          listItem.classList.add('hidden');
        }
  
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
  
      toc.appendChild(tocList);
  
      // Toggle functionality
      var tocItems = toc.querySelectorAll('.toc-item');
      tocItems.forEach(function(item) {
        var link = item.querySelector('a');
        link.addEventListener('click', function(e) {
          var currentLevel = getLevel(item);
          var nextItem = item.nextElementSibling;
  
          while (nextItem && getLevel(nextItem) > currentLevel) {
            if (getLevel(nextItem) == currentLevel + 1) {
              nextItem.classList.toggle('hidden');
            }
            nextItem = nextItem.nextElementSibling;
          }
        });
      });
  
      function getLevel(element) {
        var classes = element.className.split(' ');
        for (var i = 0; i < classes.length; i++) {
          if (classes[i].startsWith('level-')) {
            return parseInt(classes[i].split('-')[1]);
          }
        }
        return 0;
      }
    }
  });