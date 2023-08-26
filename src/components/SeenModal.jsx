import React from 'react'

function SeenModal({ setSeen, seen }) {
    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Ko'rish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setSeen({ isShow: false, item: "" })}></button>
                    </div>
                    <div className="modal-body">
                        <div style={{ maxWidth: "100%", display: "flex", justifyContent: "center" }}>
                            <img src={seen?.item} alt="" style={{ maxWidth: "100%", minWidth: "250px" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeenModal