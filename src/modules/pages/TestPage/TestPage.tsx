import React, { useState } from 'react';
import SuperButton from '../../components/SuperButton/SuperButton';
import SuperCheckbox from '../../components/SuperCheckbox/SuperCheckbox';
import SuperEditableSpan from '../../components/SuperEditableSpan/SuperEditableSpan';
import SuperRadio from '../../components/SuperRadio/SuperRadio';
import SuperSelect from '../../components/SuperSelect/SuperSelect';
import './TestPage.scss';

export const TestPage = () => {
  const arr = ['x', 'y', 'z'];
  const [value, setValue] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [radioValue, onChangeOption] = useState(arr[1]);
  const alertHandle = () =>
    alert(
      `Input value is: ${value}\nCheckbox checked: ${checked}\nSelected radio/option: ${radioValue}`
    );

  return (
    <div className="test">
      <div className="test__components">
        <div className="test__components__title">Button:</div>
        <SuperButton onClick={alertHandle} className="superButton__default">
          SuperButton
        </SuperButton>
      </div>

      <div className="test__components">
        <div className="test__components__title">CheckBox</div>
        <SuperCheckbox checked={checked} onChangeChecked={setChecked} />
      </div>

      <div className="test__components">
        <div className="test__components__title">EdiTableSpan</div>
        <SuperEditableSpan
          value={value}
          onChangeText={setValue}
          spanProps={{ children: value ? undefined : 'Enter text...' }}
        />
      </div>
      <div className="test__components">
        <div className="test__components__title">SuperSelect</div>

        <SuperSelect options={arr} value={radioValue} onChangeOption={onChangeOption} />
      </div>

      <div className="test__components">
        <div className="test__components__title">SuperRadio</div>
        <div>
          <SuperRadio
            name={'radio'}
            options={arr}
            value={radioValue}
            onChangeOption={onChangeOption}
          />
        </div>
      </div>
    </div>
  );
};
