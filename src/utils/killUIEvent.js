function killUIEvent(e) {
  e.stopPropagation();
  e.stopImmediatePropagation();
  e.preventDefault();
}

export default killUIEvent;
