import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';

interface LayoutProps {
  children: ReactNode;
  statusBarColor?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  statusBarColor = '#1F2937',
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  container: {
    flex: 1,
  },
});

export default Layout;
