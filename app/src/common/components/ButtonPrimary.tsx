/* eslint-disable @typescript-eslint/no-explicit-any */

export enum StatusButton{
    Enabled,
    Loading,
    Disabled
}

function IsActive(props:any) {
    return <button className="button w-full" onClick={props.customClickEvent}  type={props.type}>{props.textName}</button>
}

function Desactive(props:any) {
    return <button className="button-disabled  w-full" type="button" >{props.textName}</button>
}
function Loader() {
    return <button className="buttonForm  w-full" onClick={()=>null} type="button">
            <div className="flex flex-row items-center justify-center">
                <span
                    className=""
                    >Cargando...</span>
                <i className="pi pi-spin pi-spinner ml-5" style={{ fontSize: '2rem' }}></i>
            </div>
        </button>
}

export const ButtonPrimary = (props:any) => {
    const status = props.status;
    if (status ==StatusButton.Enabled) {
        return <IsActive textName={props.textName}  customClickEvent={props.customClickEvent} type={props.type} />;
    }else if(status ==StatusButton.Disabled){
        return <Desactive textName={props.textName}  type={props.type}/>;
    }else{
        return <Loader/>;

    }
    
}
