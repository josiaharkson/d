import React from 'react';
import Card from 'react-bootstrap/Card';
import './style.css'

const Search = () => {
  return (
    <div className="searchParams">
     <Card style={{ borderRadius: '55px' }}>
      <Card.Header className="ssheader">
        
      </Card.Header>
      <Card.Body className="body">
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
            erat a ante.{' '}
          </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Search;
