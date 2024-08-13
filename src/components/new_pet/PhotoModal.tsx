import { Colors } from "@/constants/colors";
import { handleCamera, handleGallery } from "@/utils/camera";
import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface PhotoModalProps {
  handleInputChange: (fieldName: string, fieldValue: string) => void;
  visible: boolean;
  setPhotoModalVisible: Dispatch<SetStateAction<boolean>>;
}

const PhotoModal = ({
  handleInputChange,
  visible,
  setPhotoModalVisible,
}: PhotoModalProps) => {
  const handlePhotoUpload = async () => {
    const result = await handleCamera();

    if (result) {
      handleInputChange("imageUrl", result);
      setPhotoModalVisible(false);
    }
  };

  const handleGalleryUpload = async () => {
    const result = await handleGallery();

    if (result) {
      handleInputChange("imageUrl", result);
      setPhotoModalVisible(false);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      onDismiss={() => setPhotoModalVisible(false)}
      animationType="slide"
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => setPhotoModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome
              name="camera-retro"
              size={moderateScale(40)}
              color={Colors.primary}
              onPress={handlePhotoUpload}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome
              name="file-picture-o"
              size={moderateScale(40)}
              color={Colors.primary}
              onPress={handleGalleryUpload}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PhotoModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    backgroundColor: Colors.primary,
    padding: moderateScale(6),
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(50),
    paddingHorizontal: moderateScale(10),
  },
  iconButton: {
    backgroundColor: Colors.white,
    width: moderateScale(100),
    aspectRatio: 1,
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
});
