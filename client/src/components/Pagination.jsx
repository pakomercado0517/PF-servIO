import React, {useState, useEffect} from "react";
import './styles/pagination.css'
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [state, setstate] = useState("professional")

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(()=> {
    localStorage.setItem('mood', 'professionals')
  },[])

  function moodRender(e){
    if(e === 'btnradio2') {
        window.localStorage.setItem("mood", "professionals")
        setstate('professional')
    } 
    if (e === 'btnradio1') {
        window.localStorage.setItem("mood", 'user')
        setstate('user')
    }
  }

  return (
    <div className='pagination'>
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={(e) => moodRender(e.target.id)} checked={localStorage.mood === 'professionals'}/>
        <label class="btn btn-outline-info" for="btnradio2">Profesionales</label>
        
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={(e) => moodRender(e.target.id)} checked={localStorage.mood === 'user'}/>
        <label class="btn btn-outline-info" for="btnradio1">Usuarios</label>
      </div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
