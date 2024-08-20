import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TermsAndConditions = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: 'center', width: '100%' }}>Shop Policy</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1rem' }}>Regulamin Sklepu Internetowego HustleTees</p>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>1. Postanowienia Ogólne</h3>
                <p>1.1. Sklep internetowy HustleTees, dostępny pod adresem [Twoja domena], prowadzony jest przez [Twoja Firma], z siedzibą w [Twój Adres], NIP: [Twój NIP], REGON: [Twój REGON].</p>
                <p>1.2. Niniejszy regulamin określa zasady korzystania ze sklepu internetowego HustleTees, składania zamówień, dostarczania zamówionych produktów, uiszczania ceny przez klienta, uprawnienia klienta do odstąpienia od umowy oraz zasady składania i rozpatrywania reklamacji.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>2. Oferta Produktowa</h3>
                <p>2.1. Sklep HustleTees specjalizuje się w sprzedaży odzieży i obuwia dziecięcego. Wszystkie oferowane produkty są przeznaczone wyłącznie dla osób do 18. roku życia.</p>
                <p>2.2. Produkty dostępne w sklepie są wyprodukowane i zaprojektowane z myślą o dzieciach i młodzieży. Ich rozmiary, styl i funkcjonalność są dostosowane do potrzeb tej grupy wiekowej.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>3. Ceny i Podatki</h3>
                <p>3.1. Wszystkie ceny podane na stronie sklepu są cenami brutto (zawierają podatek VAT) i wyrażone są w polskich złotych (PLN).</p>
                <p>3.2. Ze względu na przeznaczenie produktów dla dzieci do 18. roku życia, ceny produktów obejmują obniżoną stawkę VAT 5%, zgodnie z ustawą o podatku od towarów i usług.</p>
                <p>3.3. Sklep zastrzega sobie prawo do zmiany cen produktów, wprowadzania nowych produktów do oferty sklepu, przeprowadzania i odwoływania akcji promocyjnych na stronie sklepu bądź wprowadzania w nich zmian zgodnie z obowiązującymi przepisami prawa.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>4. Zamówienia</h3>
                <p>4.1. Zamówienia w sklepie HustleTees mogą składać osoby fizyczne posiadające pełną zdolność do czynności prawnych, w tym osoby dorosłe, jednak produkty oferowane są wyłącznie z myślą o dzieciach do 18. roku życia.</p>
                <p>4.2. Klient składa zamówienie poprzez dodanie wybranych produktów do koszyka, a następnie przejście do procedury zamówienia, wypełniając formularz z danymi do wysyłki oraz wybierając formę płatności.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>5. Realizacja Zamówień</h3>
                <p>5.1. Sklep HustleTees realizuje zamówienia na terenie Polski. Przewidywany czas realizacji zamówienia to [czas realizacji] dni roboczych od momentu potwierdzenia zamówienia.</p>
                <p>5.2. W przypadku braku możliwości realizacji zamówienia z przyczyn niezależnych od sklepu, klient zostanie niezwłocznie poinformowany o tym fakcie, a ewentualna płatność zostanie zwrócona.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>6. Płatności</h3>
                <p>6.1. Płatność za zamówione produkty może być dokonywana za pośrednictwem dostępnych w sklepie form płatności, takich jak [wymień dostępne formy płatności, np. przelew bankowy, płatności online, płatność kartą kredytową].</p>
                <p>6.2. W przypadku wyboru płatności online, realizacja zamówienia rozpocznie się po otrzymaniu potwierdzenia dokonania płatności.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>7. Reklamacje i Zwroty</h3>
                <p>7.1. Klient ma prawo do zwrotu zamówionych produktów w ciągu 14 dni od ich otrzymania, bez podania przyczyny, o ile produkt jest nieużywany i w oryginalnym opakowaniu.</p>
                <p>7.2. Reklamacje dotyczące uszkodzeń mechanicznych powstałych podczas transportu będą rozpatrywane tylko na podstawie protokołu szkody sporządzonego w obecności dostawcy.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>8. Ochrona Danych Osobowych</h3>
                <p>8.1. Dane osobowe klientów przetwarzane są zgodnie z obowiązującymi przepisami prawa oraz zgodnie z polityką prywatności sklepu HustleTees.</p>
                <p>8.2. Klient ma prawo wglądu do swoich danych osobowych, ich poprawiania oraz żądania ich usunięcia.</p>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>9. Postanowienia Końcowe</h3>
                <p>9.1. Sklep HustleTees zastrzega sobie prawo do wprowadzania zmian w niniejszym regulaminie. Wszelkie zmiany będą obowiązywać od momentu ich opublikowania na stronie internetowej sklepu.</p>
                <p>9.2. W sprawach nieuregulowanych niniejszym regulaminem mają zastosowanie przepisy prawa polskiego, w tym Kodeksu cywilnego oraz ustawy o prawach konsumenta.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TermsAndConditions;
