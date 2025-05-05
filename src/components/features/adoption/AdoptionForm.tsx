import React, { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/forms/Button';
import { AdoptionFormProps, AdoptionFormValues, adoptionFormSchema } from './types';
import AdoptionFormStepPersonal from './AdoptionFormStepPersonal';
import { AdoptionFormStepAddress } from './AdoptionFormStepAddress';
import { AdoptionFormStepLiving } from './AdoptionFormStepLiving';
import { AdoptionFormStepPetExperience } from './AdoptionFormStepPetExperience';
import { AdoptionFormStepFamily } from './AdoptionFormStepFamily';
import { AdoptionFormStepAdoption } from './AdoptionFormStepAdoption';

const AdoptionForm: React.FC<AdoptionFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6; // Number of form sections

  const form = useForm<AdoptionFormValues>({
    resolver: zodResolver(adoptionFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      occupation: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      livingType: 'casa',
      hasGarden: false,
      yardSize: '',
      homeType: '',
      hasOtherPets: false,
      otherPetsDescription: '',
      experience: '',
      hoursAlone: '',
      familyMembers: '',
      workSchedule: '',
      adoptionReason: '',
      previousExperience: '',
      petPreferences: '',
      agreeTerms: false,
    },
  });

  const handleClose = useCallback(() => {
    form.reset();
    setCurrentStep(0);
    onClose();
  }, [form, onClose]);

  const handleSubmit = (data: AdoptionFormValues) => {
    onSubmit(data);
    handleClose();
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.querySelector('.adoption-modal-dialog');
      if (modal && !modal.contains(e.target as Node) && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AdoptionFormStepPersonal />;
      case 1:
        return <AdoptionFormStepAddress />;
      case 2:
        return <AdoptionFormStepLiving />;
      case 3:
        return <AdoptionFormStepPetExperience />;
      case 4:
        return <AdoptionFormStepFamily />;
      case 5:
        return <AdoptionFormStepAdoption />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`modal fade show`} style={{ display: isOpen ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Formulario de Adopción</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-1">
                  <span className="small">Paso {currentStep + 1} de {totalSteps}</span>
                  <span className="small">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    aria-valuenow={((currentStep + 1) / totalSteps) * 100}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  {renderStep()}
                  <div className="d-flex justify-content-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="btn btn-outline-secondary"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      Anterior
                    </Button>
                    {currentStep === totalSteps - 1 ? (
                      <Button type="submit" className="btn btn-primary">Enviar Solicitud</Button>
                    ) : (
                      <Button type="button" className="btn btn-primary" onClick={handleNext}>
                        Siguiente
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptionForm; 