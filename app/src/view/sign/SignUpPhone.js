import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import SignUpNextButton from './SignUpNextButton';
import LabelView from './LabelView';
import PhoneNumberInputTextView from './PhoneNumberInputTextView';
import SignErrorMessageView from './SignErrorMessageView';
import { SIGN_UP_PHONE_VIEW_STATUS } from '../../constant/SignUpPhoneStatus';
import PhoneCodeInputTextView from './PhoneCodeInputTextView';
import PhoneCodeNextButton from './PhoneCodeNextButton';
import { COLORS } from '../../assets/Colors';

// 컴포넌트를 생성 할 때는 constructor -> componentWillMount -> render -> componentDidMount 순으로 진행됩니다.

// 컴포넌트를 제거 할 때는 componentWillUnmount 메소드만 실행됩니다.

// 컴포넌트의 prop이 변경될 때엔 componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate 순으로 진행됩니다.

// 이 예제에는 없지만 state가 변경될 떄엔 props 를 받았을 때 와 비슷하지만 shouldComponentUpdate 부터 시작됩니다.

@inject('signUpPhoneStore')
@observer
class SignUpPhone extends React.Component {
  constructor(props) {
    super(props);
  }

  // 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드입니다.
  // 이 안에서 다른 JavaScript 프레임워크를 연동하거나,
  // setTimeout, setInterval 및 AJAX 처리 등을 넣습니다.
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      this.props.signUpPhoneStore.clearPhoneNumber.bind(this)
    );
  }

  componentWillUnmount() {
    this.focusListener();
  }

  async signUpNextButtonClicked() {
    await this.props.signUpPhoneStore.completePhoneNumber();
    this.props.navigation.navigate('SignUpTermsAgreement');
  }

  // prop 혹은 state 가 변경 되었을 때, 리렌더링을 할지 말지 정하는 메소드입니다.
  // 위 예제에선 무조건 true 를 반환 하도록 하였지만, 실제로 사용 할 떄는 필요한 비교를 하고 값을 반환하도록 하시길 바랍니다.
  // 예: return nextProps.id !== this.props.id;
  // JSON.stringify() 를 쓰면 여러 field 를 편하게 비교 할 수 있답니다.
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.body}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.contentContainer}>
              <LabelView text="핸드폰 인증" />
              <View style={styles.phoneCodeContainer}>
                <PhoneNumberInputTextView
                  isActive={!this.props.signUpPhoneStore.isAllCompleted}
                  text={this.props.signUpPhoneStore.phoneNumber}
                  onChangeText={this.props.signUpPhoneStore.phoneNumberChanged.bind(this)}
                />
                <PhoneCodeNextButton
                  isActive={this.props.signUpPhoneStore.isValidPhoneNumber}
                  text={
                    this.props.signUpPhoneStore.phoneValidationViewStatus ===
                    SIGN_UP_PHONE_VIEW_STATUS.PHONE_NUMBER_SENT_AFTER
                      ? '재인증'
                      : '인 증'
                  }
                  onClick={this.props.signUpPhoneStore.sendPhoneCode.bind(this)}
                />
              </View>
              {this.props.signUpPhoneStore.phoneValidationViewStatus ===
              SIGN_UP_PHONE_VIEW_STATUS.PHONE_NUMBER_SENT_AFTER ? (
                <View style={styles.phoneCodeContainer}>
                  <PhoneCodeInputTextView
                    onChangeText={this.props.signUpPhoneStore.phoneCodeChanged.bind(this)}
                    text={this.props.signUpPhoneStore.phoneCode}
                  />
                  {/* <PhoneCodeNextButton */}
                  {/*    text="인증" */}
                  {/*    isActive={this.props.signUpPhoneStore.isValidPhoneCode} */}
                  {/*    onClick={this.props.signUpPhoneStore.phoneCodeValidationSucceed.bind( */}
                  {/*        this */}
                  {/*    )} */}
                  {/* /> */}
                  <Text>3:00</Text>
                </View>
              ) : null}
              <SignErrorMessageView text={this.props.signUpPhoneStore.errorMessage} />
              <View style={styles.bottomContainer}>
                <SignUpNextButton
                  isActive={this.props.signUpPhoneStore.isAllCompleted}
                  text="시 작 하 기"
                  onClick={this.signUpNextButtonClicked.bind(this)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLORS.MAIN_COLOR,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  inner: {
    flex: 1,
    backgroundColor: COLORS.MAIN_COLOR,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '85%',
    // paddingTop:30
  },

  phoneCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.FONT_GRAY,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    backgroundColor: COLORS.MAIN_COLOR,
    width: '100%',
    justifyContent: 'center',
    // borderWidth: 2
  },
  bottomContainer: {
    // borderWidth:2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 60,
    flex: 1,
  },
});

export default SignUpPhone;
