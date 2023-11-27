/* eslint-disable */
import { useState } from 'react';
import { MoonStarsFill } from 'react-bootstrap-icons';
import { SunFill } from 'react-bootstrap-icons';

export default function ChangeTheme() {
  const [theme, setTheme] = useState('light');
  const body = document.querySelector('body');


  function changeTheme() {
    if (theme === 'light') {
      setTheme('dark');
      body.setAttribute('data-bs-theme', 'dark');
    } else {
      setTheme('light');
      body.setAttribute('data-bs-theme', 'light');
    }
  }

  return (
    <button onClick={changeTheme} className="btn border-secondary">
      {theme === 'light' &&
        <MoonStarsFill color="royalblue"/>
      }
      <i class="bi-alarm"></i>

     {theme === 'dark' &&
       <SunFill color="royalblue" />
      }
    </button>
  )
}
