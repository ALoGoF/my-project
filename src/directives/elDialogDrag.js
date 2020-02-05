export default {
  inserted(el) {
    const dialogDom = el.querySelector('.el-dialog');

    el.__dialogHeaderDom = el.querySelector('.el-dialog__header');
    el.__dialogHeaderDom.classList.add('draggable');

    el.__handleMouseDown = function(e) {
      let mouseInDialogPos = {
        x: e.pageX - dialogDom.offsetLeft,
        y: e.pageY - dialogDom.offsetTop
      };

      function handleMouseMove(e) {
        let mouseInPagePos = {
          x: e.pageX,
          y: e.pageY
        };
        let moveMarginLeft = mouseInPagePos.x - mouseInDialogPos.x;
        let moveMarginTop = mouseInPagePos.y - mouseInDialogPos.y;
        let maxMarginLeft = el.clientWidth - dialogDom.clientWidth;
        let maxMarginTop = el.clientHeight - dialogDom.clientHeight;

        if (moveMarginLeft < 0) {
          dialogDom.style.marginLeft = 0;
        } else if (moveMarginLeft > maxMarginLeft) {
          dialogDom.style.marginLeft =`${maxMarginLeft}px`;
        } else {
          dialogDom.style.marginLeft = `${moveMarginLeft}px`;
        }

        if (moveMarginTop < 0) {
          dialogDom.style.marginTop = 0;
        } else if (moveMarginTop >  maxMarginTop) {
          dialogDom.style.marginTop =`${maxMarginTop}px`;
        } else {
          dialogDom.style.marginTop = `${moveMarginTop}px`;
        }
        e.preventDefault();
      }

      function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      e.preventDefault();
    };

    el.__dialogHeaderDom.addEventListener('mousedown', el.__handleMouseDown);
  },
  unbind(el) {
    el.__dialogHeaderDom.removeEventListener('mousedown', el.__handleMouseDown);
    // 可能没必要
    el.__dialogHeaderDom = null;
    el.__handleMouseDown = null;
  }
};
