/* eslint-disable */
import Logo from '../utils/Images/bbb.png'
import { withRouter,Link } from 'react-router-dom'
import { FaHome,FaUser,FaSignOutAlt,FaFilePdf } from "react-icons/fa"
import { BsFillPinMapFill } from "react-icons/bs"
import { Navbar,Nav,Container } from 'react-bootstrap'
import { logout } from '../utils/Authorize'
import Swal from "sweetalert2";

const navbarComponent = ({history})=>{
  const signout=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "ต้องการที่จะ Logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '##dc3545',
      cancelButtonColor: '#595959',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        logout(()=>history.push("/login"))
      }
    })
  }
  return(
    <Navbar className='py-0' collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" >
    <Container>
        <Link className='navbar-brand' to='/'>
        <h2>
          <img alt="" src={Logo} width="40" height="40" className="d-inline-block align-top"/>{' '}
          Thanes Programmer
        </h2>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto' style={{ padding: 5 }}>
            <Link to='/createreport' className='nav-link text-purple' align="center"><FaFilePdf size={28} /> <br /> สร้างรายงาน</Link>
            <Link to='/' className='nav-link' align="center"><FaHome size={28} /> <br /> หน้าแรก</Link>
            <Link to='/user' className='nav-link' align="center"><FaUser size={28} /> <br /> จัดการผู้ใช้งาน</Link>
            <Link to='/location' className='nav-link' align="center"><BsFillPinMapFill size={28} /><br /> จัดการสถานที่</Link>
            <Nav.Link onClick={signout} align="center"><FaSignOutAlt size={28} /> <br /> Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default withRouter(navbarComponent)