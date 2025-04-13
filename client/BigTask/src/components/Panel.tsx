
type Panel = {
    header: string,
    w: string,
    flex?: boolean,
}

function Panel(props: Panel) {
  return (
    <div style={{backgroundColor: '#EBF0F7'}} className={`m-5 ${props.w} ${props.flex ? 'flex-1' : 'flex-none'}`}>gfgf</div>
  )
}



export default Panel

