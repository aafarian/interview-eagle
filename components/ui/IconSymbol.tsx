// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'account-circle': 'account-circle',
  'home': 'home',
  'send': 'send',
  'person.fill': 'person',
  'gear': 'settings',
  'questionmark.circle.fill': 'help-outline',
  'arrow.right.square': 'logout',
  'chevron.right': 'chevron-right',
  'person.crop.circle.fill': 'account-circle',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses MaterialIcons on Android and web.
 * See available icons at: https://icons.expo.fyi/MaterialIcons
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
