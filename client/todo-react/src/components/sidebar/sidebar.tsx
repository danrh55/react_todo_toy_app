import CategoryList from "./categoryList";

function Sidebar() {
  return (
    <>
      <div id="sidebar">
        <CategoryList category={'all'}></CategoryList>
        <CategoryList category={'completed'}></CategoryList>
      </div>
    </>
  )
}

export default Sidebar;