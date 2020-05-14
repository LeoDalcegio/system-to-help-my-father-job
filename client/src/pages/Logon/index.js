import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Logon() {
    return (
        <div className="logon-container">
            <p>Logon</p>
        </div>
    )
}