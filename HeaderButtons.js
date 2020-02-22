import React from 'react';
import {
  HeaderButtons as RNHeaderButtons,
  HeaderButton as RNHeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import {IconOutline} from '@ant-design/icons-react-native';

const HeaderButton = props => {
  return (
    <RNHeaderButton
      {...props}
      IconComponent={IconOutline}
      iconSize={props.iconSize || 23}
      color={props.color || '#000000'}
    />
  );
};

const HeaderButtons = props => {
  return <RNHeaderButtons HeaderButtonComponent={HeaderButton} {...props} />;
};

HeaderButtons.Item = Item;

export default HeaderButtons;
