import React, { useCallback, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
        Alert,
        AlertDescription,
        AlertIcon,
        Box,
        CloseButton,
        Modal,
        ModalBody,
        ModalCloseButton,
        ModalContent,
        ModalHeader,
        ModalOverlay
} from '@chakra-ui/react';
import { Formik } from 'formik';
import validationMarca from './Schema';
import MarcasServices from '../../services/MarcasServices';
import Loading from '../../components/Loading';

export default NiceModal.create(({ marca }) => {
        const modal = useModal();

        const [loading, setLoading] = useState(false);
        const [info, setInfo] = useState(null);

        const handleSubmit = useCallback(
                async (values) => {
                        const newMarca = { ...values };
                        try {
                                setLoading(true);
                                if (!marca) {
                                        await MarcasServices.post(newMarca);
                                } else {
                                        await MarcasServices.update(newMarca);
                                }
                                modal.resolve(newMarca);
                                await modal.remove();
                        } catch (e) {
                                setInfo({
                                        type: 'error',
                                        message: 'se ha producido un error,por favor intentelo más tarde.'
                                });
                        } finally {
                                setLoading(false);
                        }
                },
                [modal, marca]
        );

        return (
                <Modal isOpen={modal.visible} size="xl" onClose={() => modal.hide()}>
                        <ModalOverlay />
                        <ModalContent>
                                <ModalHeader>{marca ? 'Actualizar Marca' : 'Crear Marca'}</ModalHeader>
                                <ModalCloseButton />
                                {loading && (
                                        <div className="py-4">
                                                <Loading />
                                        </div>
                                )}
                                {!loading && (
                                        <ModalBody>
                                                {info && (
                                                        <div className="mb-2">
                                                                <Alert status={info.type}>
                                                                        <AlertIcon />
                                                                        <Box flex="1">
                                                                                <AlertDescription display="block">
                                                                                        {info.message}
                                                                                </AlertDescription>
                                                                        </Box>
                                                                        <CloseButton
                                                                                position="absolute"
                                                                                right="8px"
                                                                                top="8px"
                                                                                onClick={() => setInfo(null)}
                                                                        />
                                                                </Alert>
                                                        </div>
                                                )}
                                                <Formik
                                                        initialValues={
                                                                marca || {
                                                                        id: '',
                                                                        nombre: ''
                                                                }
                                                        }
                                                        enableReinitialize
                                                        validationSchema={validationMarca}
                                                        onSubmit={(values) => {
                                                                handleSubmit(values);
                                                        }}
                                                >
                                                        {(formik) => (
                                                                <form className="my-4" onSubmit={formik.handleSubmit}>
                                                                        <div className="flex flex-wrap -mx-3 mb-2">
                                                                                <div className="w-full px-3 mb-6 md:mb-0">
                                                                                        <label
                                                                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                                                                htmlFor="grid-name"
                                                                                        >
                                                                                                Nombre
                                                                                        </label>
                                                                                        <input
                                                                                                className={`input-box ${formik.errors.nombre ? 'border border-red-500' : ''
                                                                                                        }`}
                                                                                                id="grid-name"
                                                                                                type="text"
                                                                                                name="nombre"
                                                                                                value={formik.values.nombre}
                                                                                                placeholder="name"
                                                                                                onChange={formik.handleChange}
                                                                                        />
                                                                                </div>
                                                                        </div>
                                                                        <div className="flex justify-end mt-4">
                                                                                <button type="submit" className="btn btn-success">
                                                                                        Guardar
                                                                                </button>
                                                                                <button
                                                                                        type="button"
                                                                                        className="btn btn-danger ml-2"
                                                                                        onClick={() => modal.hide()}
                                                                                >
                                                                                        Cancelar
                                                                                </button>
                                                                        </div>
                                                                </form>
                                                        )}
                                                </Formik>
                                        </ModalBody>
                                )}
                        </ModalContent>
                </Modal>
        );
});
