import React from "react";
import { Modal } from "react-native";
import SearchForm from "./searchForm";

export default function SearchPopup({ isVisible, setModalVisible, getNewPosts }) {

    const hideModal = () => {
        setModalVisible(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={hideModal}
            >
            <SearchForm setModalVisible={setModalVisible} getNewPosts={getNewPosts}/>
        </Modal>
    );
}