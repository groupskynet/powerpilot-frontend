import React, { useCallback, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { Formik } from 'formik';
import Select from 'react-select';

const validate = (values) => {
  const errors = {};
  if (!values.accesorio) errors.accesorio = 'El Accesorio es requerido';
  if (!values.valor) errors.valor = 'El valor es requerido';
  return errors;
};

export default NiceModal.create(({ accesorios = [] }) => {
  const modal = useModal();

  const [info, setInfo] = useState(null);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        modal.resolve(values);
        await modal.remove();
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error,por favor intentelo más tarde.'
        });
      }
    },
    [modal]
  );

  return (
    <Modal isOpen={modal.visible} size="3xl" onClose={() => modal.remove()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Accesorio</ModalHeader>
        <ModalCloseButton />
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
            initialValues={{
              accesorio: '',
              valor: ''
            }}
            validate={validate}
            enableReinitialize
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(formik) => (
              <form className="my-4" onSubmit={formik.handleSubmit}>
                <Box display="flex" alignItems="center">
                  <FormControl>
                    <FormLabel>Accesorio</FormLabel>
                    <Select
                      options={accesorios}
                      getOptionLabel={(accesorio) =>
                        accesorio && accesorio.nombre
                      }
                      getOptionValue={(accesorio) => accesorio && accesorio.id}
                      value={accesorios.filter(
                        (accesorio) =>
                          accesorio.id === formik.values.accesorio?.id
                      )}
                      onChange={(accesorio) => {
                        formik.setFieldValue('accesorio', accesorio);
                      }}
                    />
                  </FormControl>
                  <FormControl marginLeft={2}>
                    <FormLabel>Valor por Hora</FormLabel>
                    <Input
                      placeholder="$ valor"
                      border={`${
                        formik.errors.valor && formik.touched.valor
                          ? '1px solid red'
                          : '1px solid gray'
                      }`}
                      value={formik.values.valor || ''}
                      onChange={(event) =>
                        formik.setFieldValue('valor', event.target.value)
                      }
                    />
                  </FormControl>
                </Box>
                <div className="flex flex-wrap -mx-3 mb-2" />
                <div className="flex justify-end mt-4">
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => modal.remove()}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
