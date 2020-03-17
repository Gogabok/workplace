export default function ({store, redirect}) {
  if(!allParamsSelected(store)) {
    return redirect('/')
  }
}
function allParamsSelected(store) {
  return store.getters.getSelectedManufacturer && store.getters.getSelectedModification && store.getters.getSelectedModel;
}
