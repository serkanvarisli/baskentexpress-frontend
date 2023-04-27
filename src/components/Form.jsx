import React from 'react';
import '../style.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://baskentexpress.onrender.com/api';

const Form = () => {
    const [train, setTrain] = useState();
    const [key, setKey] = useState(0);
    const [postValue, setPostValue] = useState();
    const [check, setCheck] = useState(false);

    const handleOnChange = (e) => {
        setPostValue({ ...postValue, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('');
        axios({
            method: 'post',
            url: url,
            mode: 'cors',
            data: {
                Tren: {
                    Ad: 'Başkent Ekspres',
                    Vagonlar: [
                        { Ad: 'Vagon 1', Kapasite: 100, DoluKoltukAdet: 68 },
                        { Ad: 'Vagon 2', Kapasite: 90, DoluKoltukAdet: 50 },
                        { Ad: 'Vagon 3', Kapasite: 80, DoluKoltukAdet: 80 },
                    ],
                },
                RezervasyonYapilacakKisiSayisi:
                    postValue.RezervasyonYapilacakKisiSayisi,
                KisilerFarkliVagonlaraYerlestirilebilir: check,
            },
        });
    };
    const toggleCheck = () => setCheck((prevCheck) => !prevCheck);

    const fetchTrain = async () => {
        try {
            const { data } = await axios.get(url + '/getTrainInformation');
            setTrain(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchTrain();
    }, []);

    if (!train) return null;

    console.log(train);
    return (
        <div>
            <form action="" onSubmit={handleSubmit} onChange={handleOnChange}>
                <label htmlFor="vagons" className="label1">
                    Vagon Adı
                </label>{' '}
                <br />
                <select name="Vagonlar" id="vagons" required>
                    <option value="vagon0" id="vagon0" disabled selected>
                        Vagon Seçiniz..
                    </option>

                    {train.Tren.Vagonlar.map((vagon) => {
                        return (
                            <option
                                key={train.Tren.Vagonlar.indexOf(vagon) + 1}
                                id={
                                    'vagon' +
                                    (train.Tren.Vagonlar.indexOf(vagon) + 1)
                                }
                                value={vagon.Ad}
                            >
                                {vagon.Ad}
                            </option>
                        );
                    })}
                </select>
                <label htmlFor="passangerCount">Kişi Sayısı</label>
                <input
                    type="number"
                    id="passangerCount"
                    name="RezervasyonYapilacakKisiSayisi"
                    required
                />
                <ul>
                    <li>
                        <label htmlFor="permDiffVagons">
                            Farklı Vagonlara Yerleştirilebilir
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            onChange={toggleCheck}
                            id="permDiffVagons"
                            name="KisilerFarkliVagonlaraYerlestirilebilir"
                        />
                    </li>
                </ul>
                <input type="submit" Value="Rezervasyon Yap" id="btn" />
            </form>
        </div>
    );
};

export default Form;
