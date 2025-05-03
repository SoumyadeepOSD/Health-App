/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { useUploadProfileMutation } from '../../lib/mutations';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthStore } from '../../store/authStore';
import { ActivityIndicator, Button, Image, Text, TextInput, View } from 'react-native';

const ProfileSetupScreen = () => {
  const userId = useAuthStore.getState().userId;
  const accessToken = useAuthStore.getState().accessToken;
  console.log(`userid ${userId}, token ${accessToken}`);
  const [fullName, setFullName] = useState<string>('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null | any>(null);

  const { mutate: uploadProfile, isPending, isError, error } = useUploadProfileMutation();
  const navigation = useNavigation<any>();

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) { return; }
      if (response.errorCode) {
        console.log('Error', response.errorMessage || 'Image picker error');
        return;
      }
      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setSelectedImageUri(uri);
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedImageUri || !fullName.trim()) {
      console.log('Missing info', 'Please select an image and enter your full name');
      return;
    }

    uploadProfile(
      { fileUri: selectedImageUri, fullName: fullName, is_profile_completed: true },
      {
        onSuccess: () => {
          useAuthStore.getState().setProfileCompleted(true);
          navigation.replace('Home');
          console.log('successfull');
        },
        onError: (err: any) => {
          console.log('Upload Failed', err.message);
        },
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Complete Your Profile</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Choose Profile Picture" onPress={pickImage} />
      {selectedImageUri && (
        <Image
          source={{ uri: selectedImageUri }}
          style={{ width: 100, height: 100, marginVertical: 15, borderRadius: 50 }}
        />
      )}

      {isPending ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Save & Continue" onPress={handleSubmit} disabled={isPending} />
      )}
      {isError && <Text style={{ color: 'red' }}>{error.message}</Text>}
      {selectedImageUri && (
        <Text style={{ fontSize: 12, color: 'gray' }}>{selectedImageUri}</Text>
      )}

    </View>
  );
};

export default ProfileSetupScreen;
