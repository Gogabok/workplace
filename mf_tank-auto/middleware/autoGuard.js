export default function ({store, redirect}) {
  if(!manufacturerSelected(store)) {
    return redirect('/')
  }
}
function manufacturerSelected(store) {
  return store.getters.getSelectedManufacturer !== null;
}
