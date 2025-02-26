type ItemArgsData = {
    fileName: string,
    ext: string,
    data: string
}

function CommonViewer(para: ItemArgsData) {
    var Contents;
    switch(para.ext) {
        case "pdf":
            Contents = () => (<iframe src={para.data} width="100%" height="800px" />);
            break;
        case "jpg": case "png": case "gif": case "webp":
            Contents = () => (<img src={para.data} alt="img" />);
            break;
        case "txt":
            // Contents = () => (<div>{decodeURIComponent(atob(para.data.split(',')[1]))}</div>);
            // Contents = () => (<div>ファイルプレビュー表示</div>);
            Contents = () => (<pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{ atob(para.data.split(',')[1]) }</pre>);
            
            break;
        default:
            return (<></>);
        }
    return (
        <>
        <div className="box">
            <span className="box-title">{para.fileName}</span>
            <div className="viewImage">
                <Contents />
            </div>
        </div>
        </>        
    )
}

export { CommonViewer }