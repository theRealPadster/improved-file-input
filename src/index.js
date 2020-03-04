/**
 * Class to style and handle file inputs
 * Exposes the list of files
 * @param {DOMElement} input The file input element
 * @param {number} [MAX_FILES=1] Max number of files to allow
 */
// TODO: test this more
class InputFile {
  constructor(input, MAX_FILES = 1) {
    this.input = input;
    this.MAX_FILES = input.dataset.max ? parseInt(input.dataset.max) : MAX_FILES;
    this.files = [];

    // Multiple files
    if (MAX_FILES > 1) {
      input.setAttribute('multiple','');
      input.addEventListener('change', (e) => {
        this.changeListenerMultiple();
      });
    } else { // Single file
      input.removeAttribute('multiple');
      input.addEventListener('change', (e) => {
        this.changeListenerSingle();
      });

      let removeLink = document.createElement('a');
      removeLink.href = 'javascript:;';
      removeLink.classList.add('file__remove-btn');
      removeLink.classList.add('js-remove-file');
      input.parentElement.appendChild(removeLink);

      removeLink.addEventListener('click', (e) => {
        this.removeFiles(e);
      });
    }
  }

  addToFileListUI(newFiles) {
    let list = this.input.parentElement.querySelector('.inputfile__list');

    if (!list) {
      list = document.createElement('ul');
      list.classList.add('inputfile__list');
      this.input.parentElement.appendChild(list);
    }

    const currentCount = list.querySelectorAll('.inputfile__listitem').length;

    [...newFiles].forEach((file, i) => {
      let li = document.createElement('li');
      li.classList.add('inputfile__listitem');
      li.dataset.index = currentCount + i;

      let filename = document.createElement('span');
      filename.innerHTML = file.name;
      li.appendChild(filename);

      let removeLink = document.createElement('a');
      removeLink.href = 'javascript:;';
      removeLink.classList.add('file__remove-btn');
      removeLink.classList.add('js-remove-file');
      li.appendChild(removeLink);

      removeLink.addEventListener('click', (e) => {
        this.removeFiles(e);
      }, { once: true });

      list.appendChild(li);
    });
  }

  changeListenerSingle() {
    let label = this.input.nextElementSibling;
    let labelText = label.children[0];
    let fileName = '';

    // Update class field
    this.files = this.input.files;

    if(this.input.files && this.input.files.length)
      fileName = this.input.files[0].name;

    if (fileName) {
      label.classList.add('has-file');
      labelText.innerHTML = fileName;
    }
    else {
      label.classList.remove('has-file');
      labelText.innerHTML = label.dataset.original;
    }

    // Reset file input
    this.input.value = null;
  }

  changeListenerMultiple() {
    // File(s) added
    if(this.input.files && this.input.files.length) {
      if (this.input.files.length + this.files.length > this.MAX_FILES) {
        alert(`You can only upload a total of ${this.MAX_FILES} files.`);
      } else {
        this.files.push(...this.input.files);
        console.log(this.files);
        this.addToFileListUI(this.input.files);
      }
    } // No files added
    else {
      console.log('nothing added');
    }

    // Reset file input
    this.input.value = null;
  }

  removeFiles(e) {
    e.preventDefault();

    // Multiple files
    if (this.MAX_FILES > 1) {
      const li = e.currentTarget.closest('.inputfile__listitem');
      const i = parseInt(li.dataset.index);
      const list = e.currentTarget.closest('.inputfile__list');
      this.files.splice(i, 1);
      list.removeChild(li);

      // Refresh indexes
      const allItems = list.querySelectorAll('.inputfile__listitem');
      [...allItems].forEach((item, i) => {
        item.dataset.index = i;
      });

      console.log(this.files);
    } else { // Single file
      const button = e.currentTarget;

      // Update class field
      this.files = this.input.files;

      let label = button.previousElementSibling;
      let labelText = label.children[0];

      button.previousElementSibling.previousElementSibling.value = null;
      labelText.innerHTML = label.dataset.original;
      label.classList.remove('has-file');
    }
  }
}

module.exports = InputFile;
