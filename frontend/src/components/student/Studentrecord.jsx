import React from 'react';
import {deleteStudents} from '../../store/actions/studentActions';
import {useDispatch,useSelector} from 'react-redux';
import '../../hide.css';

import {Link} from 'react-router-dom';

const Studentrecord = ({StudentRecord}) => {
      const dispatch = useDispatch();
      const deletestudent = (e,id) => {
            if (window.confirm("Are you sure?")) {
              let targetSet = e.currentTarget;
              targetSet.innerText='Deleting';
               dispatch(deleteStudents(e,id));
            }
      }      
    return (
      <tr key={StudentRecord._id}>
          <td>{StudentRecord.name}</td>
          <td>{StudentRecord.occupation}</td>
          <td>{StudentRecord.email}</td>
          <td>{StudentRecord.phone}</td>
          <td>{StudentRecord.description}</td>
          <td>{StudentRecord.gender}</td>          
          <td>{StudentRecord.age}</td>
          <td><a style={{color:'white',textDecoration: 'none'}} className='btn btn-success btn-sm' href={`/edit-student/${StudentRecord._id}`} >Edit</a></td>
          <td>
            {StudentRecord.isAdmin ?
              <><button className='btn btn-danger btn-sm' onClick={(e) => deletestudent(e,StudentRecord._id)}>Delete</button></>  : <><button className='btn btn-danger btn-sm' onClick={(e) => deletestudent(e,StudentRecord._id)} >Delete</button></>  }
          </td>    
      </tr>
    )
}
export default Studentrecord;