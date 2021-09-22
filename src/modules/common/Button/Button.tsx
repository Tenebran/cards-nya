import styles from './Button.module.css';

type ButtonPropsType = {
  title: string;
  onClickHandler?: () => void;
  disabledBtn?: boolean;
  entityStatus?: boolean;
};

export function Button(props: ButtonPropsType) {
  return (
    <div>
      <button
        disabled={props.entityStatus}
        onClick={props.onClickHandler}
        className={props.disabledBtn ? styles.btnDisabled : styles.btn}
      >
        {props.title}
      </button>
    </div>
  );
}
