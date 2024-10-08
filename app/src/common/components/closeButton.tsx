/* eslint-disable @typescript-eslint/no-explicit-any */




export const CloseButton = (props: any) => {
    return (
        <div className="flex w-full flex-row items-center justify-end">
            <button className="float-right p-3" onClick={() => props.onClick()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] stroke-globalWhite">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )

}
