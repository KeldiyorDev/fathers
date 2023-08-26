import styled from "styled-components";

export const Alert = (setAlert, color, text) => {
    setAlert({ open: true, color: color, text: text });
    setTimeout(() => {
        setAlert({ open: false, color: "", text: "" });
    }, (text?.length / 8) * 1000);
}

export default function AlertContent({ alert }) {
    return (
        alert.open && (
            <Wrapper>
                <div class={`alert alert-${alert.color} alert-dismissible`} role="alert">
                    {alert.text}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </Wrapper>
        )
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 99999;
`