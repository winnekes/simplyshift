import { Layout } from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../constants/colors";

export default function Login() {
  return (
    <Layout title="Login">
      <h3 className="title is-3 has-text-primary">Login</h3>

      <div className="columns is-vcentered is-variable is-8">
        <div className="column">
          <form>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email" />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  color={Colors.Brand01}
                  className="is-left icon is-small p-1"
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  color={Colors.Brand01}
                  className="is-left icon is-small p-1"
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a className="button is-primary is-pulled-right">Submit</a>
              </p>
            </div>
          </form>
        </div>
        <div className="column">
          <img src="/images/illustration-login.svg" />
        </div>
      </div>
    </Layout>
  );
}
