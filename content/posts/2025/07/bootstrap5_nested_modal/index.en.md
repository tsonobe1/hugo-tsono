---
title: "Implementing Nested Modals in Bootstrap 5"
author: ["tsonobe"]
date: 2025-07-19T00:00:00+09:00
lastmod: 2025-07-19T14:19:36+09:00
description: "This article demonstrates how to implement nested modals in Bootstrap 5 using jQuery and z-index manipulation, despite the framework not officially supporting this pattern."
tags: [Bootstrap5, modal, jQuery, JavaScript]
categories: [tips]
draft: false
translated_by: "ChatGPT 4o"
slug: bootstrap5_nested_modal
---

In web application development, it's often necessary to guide users through multi-step interactions or inputs. One way to achieve this is by displaying multiple modals in a stacked manner. However, Bootstrap 5 does not officially support nested modals as part of its standard functionality.

As noted in the official documentation, this is an intentional UX limitation. While it is technically possible to trigger one modal from another, the currently open modal will be closed.

{{< linkcard "https://getbootstrap.com/docs/5.0/components/modal/#toggle-between-modals" >}}

## Why the current modal gets closed

This is not about why Bootstrap 5 doesn’t support nested modals conceptually, but rather the code-level reason. Normally, Bootstrap 5 modals are triggered and managed using data attributes.

```html
<button class="btn btn-primary"
        data-bs-target="#modalA"
        data-bs-toggle="modal">
  Open second modal
</button>
```

When this is executed, Bootstrap’s JavaScript looks for any already-open modal and closes it before showing the new one:

```js
// avoid conflict when clicking modal toggler while another one is open
const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR)
if (alreadyOpen) {
  Modal.getInstance(alreadyOpen).hide()
}

const data = Modal.getOrCreateInstance(target)

data.toggle(this)
```

{{< linkcard "https://github.com/twbs/bootstrap/blob/86ffedb026636b803c7dd21cc0b804f37e7201cb/js/src/modal.js#L359" >}}

Because of this, you cannot use the data attribute approach if you want to keep multiple modals visible at the same time.

## Solution

Instead of relying on data attributes, you can call the modal instance’s `show()` method directly:
{{< linkcard "https://github.com/twbs/bootstrap/blob/86ffedb026636b803c7dd21cc0b804f37e7201cb/js/src/modal.js#L98" >}}

The `show()` method does not include logic to hide existing modals, so calling `modal.show()` programmatically allows multiple modals to be shown simultaneously.

With careful control over the `z-index` values for each modal and its `backdrop`, you can create the visual layering needed to simulate nested modals using Bootstrap 5.


## Example Implementation

The following code uses jQuery to monitor trigger buttons and dynamically manage modal and backdrop z-index values to stack multiple modals.

#### js {#js}

```javascript
$(function () {
  $(document).on('click', '.show-modal', function () {
    const nextId = $(this).data('show-modal');
    if (nextId) showModal(nextId);
  });

  function showModal(modalId) {
    const newModal = $('#' + modalId);
    const modalInstance = new bootstrap.Modal(newModal[0]);
    modalInstance.show();

    _setupModalZIndex(newModal);
    _setupBackdrop(modalId);
    _cleanupModal(newModal, modalId);
  }

  /**
   * Set the z-index of the modal.
   * z-index = 1040 + 10 * number of currently visible modals
   * (follows Bootstrap's default layering order)
   * e.g., 1st layer: 1040, 2nd layer: 1050, 3rd layer: 1060, ...
   */
  function _setupModalZIndex(modal) {
    modal.one('shown.bs.modal', function () {
      const modalCount = $('.modal.show').length;
      const zIndex = 1040 + (10 * modalCount);
      modal.css('z-index', zIndex);
      modal.data('zIndex', zIndex); // save for use in backdrop setup
    });
  }

  /**
   * Adjust the z-index of the modal's backdrop.
   * e.g., 1st layer: 1039, 2nd layer: 1049, 3rd layer: 1059, ...
   */
  function _setupBackdrop(modalId) {
    // This must be done after `shown.bs.modal` to get the correct z-index
    $('#' + modalId).one('shown.bs.modal', function () {
      const modal = $(this);
      const zIndex = modal.data('zIndex');

      const backdrop = $('.modal-backdrop')
        .not('.modal-stack')
        .last();

      backdrop
        .css('z-index', zIndex - 1) // position one level below the modal
        .addClass('modal-stack')
        .attr('data-backdrop-for', modalId); // associate for removal
    });
  }

  /**
   * When the modal is closed (hidden.bs.modal), remove the corresponding backdrop
   * and return focus to the parent modal or body.
   */
  function _cleanupModal(modal, modalId) {
    modal.one('hidden.bs.modal', () => {
      $(`.modal-backdrop[data-backdrop-for="${modalId}"]`).remove();

      const openModals = $('.modal.show');
      if (openModals.length > 0) {
        // Return focus to the parent modal
        const lastModal = openModals.last();
        const focusTarget = lastModal.find('[autofocus], .btn-close, .btn, input, select').first();
        if (focusTarget.length) focusTarget.trigger('focus');
      } else {
        // If all modals are closed, return focus to the body (for accessibility)
        $(document.activeElement).trigger('blur');
        $('body').trigger('focus');
      }
    });
  }
});
```

#### html {#html}

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<button class="btn btn-primary show-modal" data-show-modal="modal1">Open Modal 1</button>

<!-- modal 1 -->
<div class="modal" id="modal1" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal 1</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <button class="btn btn-secondary show-modal" data-show-modal="modal2">Open Modal 2</button>
      </div>
    </div>
  </div>
</div>

<!-- modal 2 -->
<div class="modal" id="modal2" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal 2</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <button class="btn btn-secondary show-modal" data-show-modal="modal3">Open Modal 3</button>
      </div>
    </div>
  </div>
</div>

<!-- modal 3 -->
<div class="modal" id="modal3" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal 3</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <button class="btn btn-secondary show-modal" data-show-modal="modal4">Open Modal 4</button>
      </div>
    </div>
  </div>
</div>

<!-- modal 4 -->
<div class="modal" id="modal4" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal 4</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <button class="btn btn-secondary show-modal" data-show-modal="modal5">Open Modal 5</button>
      </div>
    </div>
  </div>
</div>

<!-- modal 5 -->
<div class="modal" id="modal5" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal 5</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Last modal (5)</p>
      </div>
    </div>
  </div>
</div>
```

Each time a new modal is opened, its z-index and that of its backdrop are set incrementally, forming a stack like this:

```ascii
      _______________
     /               /   Modal 4
    / z-index:1070  /
   /_______________/
------ -index:1069 ----- Backdrop 4


      _______________
     /               /   Modal 3
    / z-index:1060  /
   /_______________/
----- z-index:1059 ----- Backdrop 3


      _______________
     /               /    Modal 2
    / z-index:1050  /
   /_______________/
------ z-index:1049 ----- Backdrop 2


      _______________
     /               /    Modal 1
    / z-index:1040  /
   /_______________/
------ z-index:1039 ----- Backdrop 1
```

To trigger a modal, just use a button with:
- the show-modal class
- and a data-show-modal="modalId" attribute

The modal markup itself follows the usual Bootstrap 5 pattern:
```html
<button class="btn show-modal" data-show-modal="modal1">Open Modal 1</button>
```


#### demo

{{< video src="2025-07-19_13-50-24_画面収録 2025-07-19 13.49.37.mov" width="640" >}}