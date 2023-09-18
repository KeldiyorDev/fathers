import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Navbar({ showAside, setShowAside }) {
  const inputRef = useRef(null);

  const deleteFunc = () => {
    localStorage.clear()
  }

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <Wrapper>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <div className="nav-item nav-link px-0 me-xl-4">
            <i className="bx bx-menu bx-sm" onClick={() => setShowAside(!showAside)}></i>
          </div>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          <div className="navbar-nav align-items-center">
            {/* <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                ref={inputRef}
                className="form-control border-0 shadow-none"
                placeholder="Qidiruv."
                aria-label="Search..."
              />
            </div> */}
            <div className="flex-grow-1 user">
              {
                user?.role === `admin` && (
                  <>
                    <span className="fw-semibold d-block" style={{ fontSize: "18px" }}>{user?.mudir}</span>
                    <small className="text-muted" style={{ fontSize: "16px" }}>Tuman XTB rahbari(G'ijduvon tumani)</small>
                  </>
                )
              }

              {
                user?.role === `director` && (
                  <>
                    <span className="fw-semibold d-block" style={{ fontSize: "18px" }}>{user?.director}</span>
                    <small className="text-muted" style={{ fontSize: "16px" }}>Direktor({user?.name})</small>
                  </>
                )
              }

              {
                user?.role === `classleader` && (
                  <>
                    <span className="fw-semibold d-block" style={{ fontSize: "18px" }}>{user?.leaderName}</span>
                    <small className="text-muted" style={{ fontSize: "16px" }}> Sinf rahbar({user?.name})</small>
                  </>
                )
              }
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a className="nav-link dropdown-toggle hide-arrow" href="/;" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img src="../assets/img/avatars/1.png" alt="" className="w-px-40 h-auto rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        {
                          user?.role === `admin` && (
                            <>
                              <span className="fw-semibold d-block">{user?.mudir}</span>
                              <small className="text-muted">Tuman XTB rahbari(G'ijduvon tumani)</small>
                            </>
                          )
                        }

                        {
                          user?.role === `director` && (
                            <>
                              <span className="fw-semibold d-block">{user?.director}</span>
                              <small className="text-muted">Direktor({user?.name})</small>
                            </>
                          )
                        }

                        {
                          user?.role === `classleader` && (
                            <>
                              <span className="fw-semibold d-block">{user?.leaderName}</span>
                              <small className="text-muted"> Sinf rahbar({user?.name})</small>
                            </>
                          )
                        }
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={() => deleteFunc()}>
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Chiqish</span>
                  </Link>
                </li>
                {/* <li>
                  <Link className="dropdown-item" to="/" onClick={() => deleteFunc()}>
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={() => deleteFunc()}>
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </Link>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </Wrapper>


  )
}

export default Navbar

const Wrapper = styled.div`
  @media(max-width: 992px) {
        .user {
            display: none;
        }
    }
`