import React from "react";
import { StyleSheet, Linking, TouchableOpacity } from "react-native";
import { LargeList } from "react-native-largelist-v3";
import { SafeAreaViewPlus, HideToast, OneToast, Header, Atoz, TitleSearch, UserItem } from '../../../components';
import { ConvertPinyin } from '../../../utils';
import { contacts } from './mock';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, Colors, Avatar, Card } from "react-native-ui-lib";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

});

let getPinyin = () => {
  var ch_big = 'A';
  var str_big = [];
  for (var i = 0; i < 26; i++) {
    str_big.push(String.fromCharCode(ch_big.charCodeAt(0) + i))
    if (i == 25) {
      str_big.push("#")
    }
  }
  return str_big;
}


@connect(({ index, loading }) => ({
  index,
  submitting: loading.effects['index/deviceuserlist'],
}))
class DeviceUserList extends React.Component {
  _scrollView = null;
  constructor(props) {
    super(props);
    this.state = {
      pinyin: [],
      isSpin: true,
      cur: "A",
      contacts: contacts,
      keyword: "",
      postUrl: "deviceuserlist",
      postData: {
        "chargeType": "3", //---负责类型 *  {0点检,1保养,2验证,3维修}
        "equipmentNo": "",  //--------设备编号
        "equipmentName": "",   //----------设备名称
        "userName": ""  //-------负责人名称
      }
    }
  }

  //设置新状态
  setNewState(type, values, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/' + type,
      payload: values
    }).then((res) => {
      if (!res) {
        return
      }
      fn ? fn() : null
    })
  }


  resetData = (yuan) => {
    let { index: { done, formdata } } = yuan
    function getVal(key) {
      let one = {};
      formdata.map((item) => {
        if (item.key == key) {
          one = item
        }
      });
      if(!one.type){
        return
      }
      if (one.type.indexOf("select") == -1 && one.type.indexOf("icker") == -1) {
        return one.value && one.value
      } else {
        return one.value && one.value.id
      }
    }
    if (done == "1" && formdata.length > 0) {
      this.setState({
        postData: {
          "chargeType": getVal("chargeType"), //---负责类型 *  {0点检,1保养,2验证,3维修}
          "equipmentNo": getVal("equipmentNo"),  //--------设备编号
          "equipmentName": getVal("equipmentName"),   //----------设备名称
          "userName": getVal("userName") //-------负责人名称
        },
      }, () => {
        this.getData()
      })
    } else {
      this.getData()
    }

  }

  UNSAFE_componentWillReceiveProps(np) {
    if (this.props.index.done !== np.index.done) {
      this.resetData(np);
    }
  }


  componentDidMount() {
    this.resetData(this.props)
  }
  //获取数据整理格式
  getData() {
    this.setState({
      isSpin: true
    })
    let { postData, postUrl } = this.state;

    this.setNewState(postUrl, postData, () => {
      this.setNewState("done", "0", () => {
        let newdata = [],
          res = this.props.index.deviceuserlist,
          postdata = res.map((item, i) => {
            item.header = ConvertPinyin(item.userName).substring(0, 1).toUpperCase();
            return item
          }),
          letterarr = getPinyin();
        letterarr.map((item, i) => {
          let items = [], itemz = [];
          postdata.map((list, index) => {
            if (item == list.header) {
              items.push(list)
            } else if (letterarr.indexOf(list.header) == -1) {
              itemz.push(list)
            }
          })
          let curitem = {
            header: item,
            items: item == "#" ? itemz : items
          }
          curitem.items.length == 0 ? null : newdata.push(curitem);
        })
        this.setState({
          contacts: newdata,
          pinyin: newdata.map((item) => {
            return item.header
          }),
          isSpin: false
        })


      })





    })
  }


  _renderSection = (section) => {
    return (
      <View row spread style={styles.section}>
        <Text style={{ paddingLeft: 24 }}>
          {this.state.contacts[section].header}
        </Text>

      </View>
    );
  };

  _renderIndexPath = ({ section: section, row: row }) => {
    let item = this.state.contacts[section].items[row],
      avatar = {
        title: 'Initials with Color',
        imageSource: require("../../../assets/user.png"),
      }
    return (
      <View>
        <UserItem device={true} key={section + "" + row} avatar={avatar} item={item} navigation={this.props.navigation}></UserItem>
      </View>
    );
  };

  changetodo = (index) => {
    var zm = getPinyin();
    this._scrollView.scrollToIndexPath({ section: index, row: 0 }, false);
  }

  changeData = (key, value) => {
    let { index: { formdata } } = this.props;
    let newformdata = formdata.map((item, i) => {
      if (item.key == key) {
        item.value = value
      } else {
      }
      return item
    })
    this.setNewState("formdata", newformdata)
  }


  render() {
    let { cur, contacts, isSpin, postData, pinyin } = this.state,
      { navigation, submitting, index: { res, formdata } } = this.props,
      searchprops = {
        navigation,
        placeholder: "输入姓名查询...",
        value: postData.userName,
        onChangeText: (val, ifs) => {
          this.setState({
            postData: {
              ...postData,
              userName: val
            }
          }, () => {
            this.changeData("userName", val)
            if (ifs) {
              this.getData()
            }
          })
        },
        onSubmitEditing: () => {
          this.getData()
        },
        handleFormData: (fn) => {
          let formdatas = [{
            key: "userName",
            type: "input",
            require: false,
            value: postData.userName,
            hidden: false,
            placeholder: "请输入姓名"
          }, {
            key: "equipmentNo",
            type: "input",
            require: false,
            value: postData.equipmentNo,
            hidden: false,
            placeholder: "请输入设备编号"
          }, {
            key: "equipmentName",
            type: "input",
            require: false,
            value: postData.equipmentName,
            hidden: false,
            placeholder: "请输入设备名称"
          }, {
            key: "chargeType",
            type: "select",
            require: false,
            value: "3",
            placeholder: "请选择负责类型",
            option: [{
              dicName: "点检",
              dicKey: "0"
            }, {
              dicName: "保养",
              dicKey: "1"
            }, {
              dicName: "验证",
              dicKey: "2"
            }, {
              dicName: "维修",
              dicKey: "3"
            }]
          }]
          this.setNewState("formdata", formdata.length > 0 ? formdata : formdatas, () => {
            fn ? fn() : null
          })
        }
      }, getTitle = () => {
        let title = "设备负责人"
        switch (postData.chargeType) {
          case "0":
            title = "设备点检负责人"
            break;
          case "1":
            title = "设备保养负责人"
            break;
          case "2":
            title = "设备验证负责人"
            break;
          case "3":
            title = "设备维修负责人"
            break;
        }
        return title
      }

    return (
      <SafeAreaViewPlus loading={submitting}>
        <Header title={getTitle()}>
        </Header>
        <View padding-12 style={{ paddingBottom: 0 }}>
          <TitleSearch {...searchprops}></TitleSearch>
        </View>
        <View style={{ position: "relative", flex: 1, marginTop: -3 }} row center>
          <LargeList
            ref={ref => (this._scrollView = ref)}
            style={styles.container}
            data={contacts}
            heightForSection={() => 30}
            renderSection={this._renderSection}
            heightForIndexPath={() => 77}
            renderIndexPath={this._renderIndexPath}
            renderHeader={null}
            renderFooter={null}
          />
          {
            pinyin.length > 0 && <Atoz changetodo={this.changetodo} pinyin={pinyin}>
            </Atoz>
          }



        </View>
      </SafeAreaViewPlus>
    );
  }
}
export default DeviceUserList

