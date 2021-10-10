import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import {
  Card,
  CardActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import {
//     CardType,
//     getCardsTC,
//     setCurrentCardGradeAC,
//     setCurrentCardIdAC,
//     updateCardGradeTC,
// } from "../../redux/cardsReducer";
// import { AppStore } from "../../redux/store";
// import { Button } from "../../UI-kit/Button/Button";
import styles from './Learn.module.css';
import { AppStoreType } from '../../../redux/store';
import { CardsType } from '../Cards/Cards';
import {
  cardsTC,
  getCardsTC,
  getUsersCards,
  setCurrentCardGradeAC,
  setCurrentCardIdAC,
  updateCardGradeTC,
} from '../../../redux/reducers/cardsReducer';
import { Button } from '../../../common/Button2/Button';

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer'];

const getCard = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 }
  );
  console.log('test: ', sum, rand, res);

  return cards[res.id + 1];
};

export const CardsLearn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const { cards } = useSelector((state: AppStoreType) => state.cards);
  const cardId = useSelector((state: AppStoreType) => state.cards.cardId);
  const { cardsPack } = useSelector((state: AppStoreType) => state.cardsPack);
  const { packId } = useParams<ParamsType>();
  const history = useHistory();
  const status = useSelector((state: AppStoreType) => state.app.status);

  const currentPack = cardsPack.filter(p => p._id === packId);

  console.log('Helloooooooooo', currentPack);

  const [card, setCard] = useState<CardsType>({
    answer: 'answer fake',
    cardsPack_id: '',
    comments: 'Fake comments',
    created: 'question fake',
    grade: 0,
    more_id: 'question fake',
    question: 'question fake',
    rating: 0,
    shots: 0,
    type: 'question fake',
    updated: '',
    user_id: 'question fake',
    __v: 0,
    _id: 'fake',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('LearnContainer useEffect');

    if (first) {
      dispatch(getCardsTC(packId));
      setFirst(false);
    }

    console.log('cards', cards);
    if (cards.length > 0) setCard(getCard(cards));

    return () => {
      console.log('LearnContainer useEffect off');
    };
  }, [dispatch, packId, cards, first]);

  const onNext = () => {
    setIsChecked(false);

    if (cards.length > 0) {
      dispatch(setCurrentCardIdAC(card._id));
      dispatch(updateCardGradeTC());
      setCard(getCard(cards));
    } else {
    }
  };

  // customize Radio-button
  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#21268f',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#21268f',
    },
  });

  // Inspired by blueprintjs
  function BpRadio(props: RadioProps) {
    return (
      <Radio
        sx={{
          '&:hover': {
            bgcolor: 'transparent',
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }

  return (
    <Card className={styles.card} sx={{ maxWidth: 413, minHeight: 300, margin: '100px auto' }}>
      <h2>Learn “ {currentPack[0].name} ”</h2>
      {card.question === 'question fake' ? (
        <p style={{ textAlign: 'center' }}>
          <b>No questions in this Pack!!!</b>
        </p>
      ) : (
        <p>
          <b>Question</b>: “ {card.question} “
        </p>
      )}

      {!isChecked && (
        <CardActions className={styles.actions}>
          <Button
            className={styles.cancelBtn}
            style={card.question === 'question fake' ? { margin: '0 auto' } : { margin: '0' }}
            purple
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </Button>
          {card.question !== 'question fake' && (
            <Button onClick={() => setIsChecked(true)}>check</Button>
          )}
        </CardActions>
      )}

      {isChecked && (
        <>
          <p>
            <b>Answer</b>: “ {card.answer} “
          </p>

          <FormControl component="fieldset">
            <FormLabel className={styles.legend} component="legend">
              Rate yourself:
            </FormLabel>

            <RadioGroup aria-label="Rate" defaultValue="Knew the answer" name="radio-buttons-group">
              {grades.map((g, i) => (
                <FormControlLabel
                  key={i}
                  value={i + 1}
                  control={<BpRadio />}
                  label={g}
                  onChange={() => {
                    dispatch(setCurrentCardGradeAC(i + 1));
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <CardActions className={styles.actions}>
            <Button
              className={styles.cancelBtn}
              purple
              onClick={() => {
                history.goBack();
              }}
            >
              Cancel
            </Button>
            <Button className={styles.registerBtn} onClick={onNext} disabled={status === 'loading'}>
              next
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

//Types
type ParamsType = {
  packId: string;
};
