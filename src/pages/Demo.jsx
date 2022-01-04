import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TicTacToe } from '../components/TicTacToe';
import { List } from '../components/List';


export function Demo() {
  const params = useParams()
  const components = {
    'game': <TicTacToe />,
    'list': <List />
  }
  return (
    <>
      {components[params['*']]}
    </>
  )
}