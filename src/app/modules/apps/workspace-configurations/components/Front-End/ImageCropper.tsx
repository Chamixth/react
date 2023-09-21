import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {createPortal} from 'react-dom'
import ReactCrop, {Crop, centerCrop, makeAspectCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {KTIcon} from '../../../../../../_metronic/helpers'

type Props = {
  show: boolean
  handleClose: () => void
  selectedFile: string
  setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>
  setSelectedImageURL: React.Dispatch<React.SetStateAction<string | null>>
  imageName: string
}

const modalsRoot = document.getElementById('root-modals') || document.body

const ImageCropper = ({
  show,
  handleClose,
  selectedFile,
  setSelectedImage,
  setSelectedImageURL,
  imageName,
}: Props) => {
  const [crop, setCrop] = useState<Crop>()

  function onImageLoad(e) {
    //--make center crop rectangle--
    const {naturalWidth: width, naturalHeight: height} = e.currentTarget
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    )

    setCrop(crop)
  }

  async function handleCrop() {
    const croppedImageBlob = await getCroppedImageBlob()

    if (croppedImageBlob) {
      // Convert the Blob to a File object with the appropriate type and name
      const croppedImageFile = new File([croppedImageBlob as BlobPart], imageName + '.jpg', {
        type: 'image/jpeg',
      })

      // Now you can use the croppedImageFile as needed
      console.log('Cropped Image File:', croppedImageFile)
      setSelectedImage(croppedImageFile)
      setSelectedImageURL(URL.createObjectURL(croppedImageFile))
      handleClose()
    }
  }

  async function getCroppedImageBlob() {
    const image = document.createElement('img');
    image.src = selectedFile;
  
    if (crop) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
  
      // Calculate pixel dimensions based on the crop percentages
      const canvasWidth = crop.width * (image.width / 100) * scaleX;
      const canvasHeight = crop.height * (image.height / 100) * scaleY;
  
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
  
      const ctx = canvas.getContext('2d');
  
      ctx?.drawImage(
        image,
        (crop.x / 100) * image.width * scaleX,
        (crop.y / 100) * image.height * scaleY,
        canvasWidth,
        canvasHeight,
        0,
        0,
        canvasWidth,
        canvasHeight
      );
  
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg'); // You can change the format as needed (e.g., 'image/png')
      });
    }
  }

  const handleCloseModal = () => {
    handleClose()
  }

  return createPortal(
    <Modal
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={show}
      backdrop="static"
      onHide={handleCloseModal}
    >
      <div className='modal-header bg-primary'>
        <h2 className='text-white'>Crop Image</h2>
      </div>

      <div className='modal-body py-lg-5 px-lg-5 ps-lg-3 py-md-5 ps-md-3 py-sm-5 ps-sm-3'>
        {selectedFile && (
          <div
            style={{
              width: '480px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={(crop, percentCrop) => setCrop(percentCrop)}
              aspect={16 / 9}
            >
              <img
                src={selectedFile}
                className='mh-300px mw-480px'
                onLoad={(e) => {
                  onImageLoad(e)
                }}
              />
            </ReactCrop>
          </div>
        )}

        <div className='d-flex flex-sack justify-content-center m-0 p-0 pt-10 '>
          <button type='button' className='btn btn-lg btn-primary' onClick={handleCrop}>
            Crop
            <KTIcon iconName='arrow-right' className='fs-3 ms-2' />
          </button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {ImageCropper}
