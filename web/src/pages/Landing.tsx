import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/pages/landing.module.css'
import logoImg from '../images/logo.svg'

import { FiArrowRight } from 'react-icons/fi'


const Landing = () => (
    <div id={styles.pageLanding}>
        <div className={styles.contentWrapper}>
            <img src={logoImg} alt='Happy' />

            <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>

            <div className={styles.location}>
                <strong>Erechim</strong>
                <strong>Rio Grande do Sul</strong>
            </div>

            <Link to='/app' className={styles.enterApp}>
                <FiArrowRight size={26} color={'rgba(0, 0, 0, 0.6)'} />
            </Link>
        </div>
    </div>
)

export default Landing
