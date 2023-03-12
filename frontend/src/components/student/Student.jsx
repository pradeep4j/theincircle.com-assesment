import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {getAllStudents,studentSearch} from '../../store/actions/studentActions';
import { useDispatch,useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Studentrecord from './Studentrecord';
import {FormLabel,TablePagination,styled} from '@mui/material';
import { Table, Row, Col } from 'react-bootstrap';
import Loading from '../layout/Loading';
const Student = () => {
  const dispatch = useDispatch();

  const [searchNav,setSearch] = useState('');
  const studentList = useSelector((state) => state.studentList);
  const { loading,error,studentInfo } = studentList;
  const studentBySearch = useSelector((state) => state.studentBySearch);
  let {studentInfoBySearch} = studentBySearch;
  const [dataPage, setDataPage] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let [studs,setStudent] = useState();
  //const onDataPageChange = (event, page) => setDataPage(page - 1);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 2));
    setPage(0);
  };

  const searchStudents = () => {
    setStudent('');
    const bodyNav = {
       searchValue: searchNav 
    }
     dispatch(studentSearch(bodyNav));
  }
  const clearSearch = (e) => {
     e.preventDefault();
    document.getElementById('search').value='';
    studentInfoBySearch='';
    setSearch('');
    setStudent(studentInfo);
  }
  useEffect(()=>{
    //fetchign all students
   dispatch(getAllStudents());
   setPage(0); 
  },[dispatch,dataPage]);
   let listContent;
  let count=0;
    if(loading) {
        listContent = <tr><td colSpan='10'><h5>Loading...</h5></td></tr>
    }
    else if(studentInfo && !studentInfoBySearch){
        count=studentInfo?.length;
        {studentInfo && studentInfo?.length>0 ?
        (listContent = studentInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stud) => (<Studentrecord StudentRecord={stud} />))) : (listContent = <tr><td colSpan='11'><h5>No record found</h5></td></tr>)}
    }
    else if(studentInfoBySearch && !studs){
        count=studentInfoBySearch?.length; 
        {studentInfoBySearch && studentInfoBySearch?.length>0 ?
            (listContent = studentInfoBySearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stud) => (<Studentrecord StudentRecord={stud} />))) : (listContent = <tr><td colSpan='11'><h5>No record found</h5></td></tr>)}
    }
    else if(studs){
         count=studs?.length; 
        {studs && count>0 ?
            (listContent = studs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((stud) => (<Studentrecord StudentRecord={stud} />))) : (listContent = <tr><td colSpan='11'><h5>No record found</h5></td></tr>)}
    }
    return (
    <><Row className='align-items-center'>
        <Col>
            <center><h4>All students ({`${count || 0}`})</h4></center>
        </Col>
    </Row>
    {loading ? (
                <Loading />
        ) : error ? (
                <Spanning dismissible variant='danger' duration={10}>
                        {error}
                </Spanning>
        ) : 
        (<div className='container mt-5' >
        <div className='row'>
            <div className='col-md-11'>
                <div className='card'>
                    <div className='card-header'>
                        <h4>Student Data
                            <Link to={'/create-student'} reloadDocument className="btn btn-primary btn-sm float-end">Add Student</Link>
                        </h4>
                    </div>
                    <div  >
                        <input
                                id="search"
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                style={{marginLeft:'18px',marginTop:'5px'}}
                                onChange={(e)=>setSearch(e.target.value)}
                            /><SearchIcon onClick={searchStudents} />
                        <Link onClick={clearSearch} style={{textDecoration:'none',color:'black'}}>Clear</Link>
                    </div>
                    <Table
                        striped
                        bordered
                        responsive
                        className='table-sm text-center'>
                            <thead className='fonts'>
                                <tr><th>Name</th><th>Occupation</th>
                                    <th>Email</th><th>Phone</th><th>Age</th><th>Gender</th><th>Admin</th><th>Edit</th><th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listContent}
                            </tbody>
                    </Table>
                        <TablePagination
                                rowsPerPageOptions={[0]}
                                component="div"
                                count={count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                    
                 </div>
            </div>
        </div>
    </div>
           )
    }
    </>
  )
}

export default Student;

const Spanning =  styled(FormLabel)`
color: #d32f2f;
font-size:13px;
margin: 0 0 0 .8rem;
`
