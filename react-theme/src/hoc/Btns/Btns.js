import React from 'react';

export const Btn = (props) => <button onClick={props.click}  className={ `btn ${props.classes}`}>{props.children}</button>;