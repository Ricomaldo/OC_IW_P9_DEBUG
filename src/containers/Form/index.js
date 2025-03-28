import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import "./style.css";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Saisir votre nom" label="Nom *" required />
          <Field placeholder="Saisir votre prénom" label="Prénom *" required />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder="exemple@domaine.com"
            label="Email *"
            name="email"
            required
          />
        </div>
        <div className="col">
          <Field
            placeholder="Saisir votre message"
            label="Message (entre 10 et 500 caractères)"
            type={FIELD_TYPES.TEXTAREA}
            required
            minLength={10}
            maxLength={500}
          />
        </div>
      </div>
      <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
        {sending ? "En cours" : "Envoyer"}
      </Button>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
